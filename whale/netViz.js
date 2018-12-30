// draw elements
// Get viz data
let history;
const today = new Date().toLocaleDateString("en-US").replace(/\//gi, "")

/**
 * 
 * @param {*} event 
 */
const getHistoryData = async (event) => {
    /* Get the history type and file type from the form select. */
    const type = 'viewingactivity'

    /* Find the required API call parameters in Netflix's reactContext. */
    let authUrl, buildIdentifier, apiBaseUrl
    try {

        // We rely on these three parameters to form a valid API call.
        authUrl = window.netflix.reactContext.models.memberContext.data.userInfo.authURL
        buildIdentifier = window.netflix.reactContext.models.serverDefs.data.BUILD_IDENTIFIER
        rawApiBaseUrl = window.netflix.reactContext.models.serverDefs.data.API_BASE_URL
        apiBaseUrl = decodeURI(rawApiBaseUrl)

        // If any of them is undefined, we raise an error to let the error handler handle this.
        if (
            typeof authUrl == 'undefined' ||
            typeof buildIdentifier == 'undefined' ||
            typeof rawApiBaseUrl == 'undefined'
        ) {
            console.log('some are undefined')
            throw new Error('[NVA Downloader] authUrl, buildIdentifier or apiBaseUrl locations have changed.')
        }

    } catch (err) {
        console.log(err)
        throw new Error('Unable to obtain critical API variables. Please report this issue on GitHub.')
    }

    console.debug(`[NVA Downloader] authUrl, buildIdentifier, apiBaseUrl`, authUrl, buildIdentifier, apiBaseUrl)

    /* We set the records amount to infinity for now. Once the API sends back
    less than pageSize results, we stop crawling. */
    const pageSize = 20
    const pagesToLoad = Infinity

    /* Download each page and append the results in to one array.
    By default, no recordsAmount is given, so we continue parsing pages
    until the last result has less records than the given pageSize.
    AFAIK this is also the way Netflix loads all records client-side. */

    let history = []
    for (var i = 0; i < pagesToLoad; i++) {

        const timestamp = + new Date()
        const pageNum = i
        let response

        console.debug(`[NVA Downloader] Parsing ${type} page ${pageNum}`)

        /* Construct the url for our API call and set the appropriate headers.
        Note: the apiBaseUrl begins with a forwards slash. */
        const url = `https://www.netflix.com/api${apiBaseUrl}/` +
            `${buildIdentifier}/${type}` +
            `?pg=${pageNum}&pgSize=${pageSize}&_=${timestamp}` +
            `&authURL=${authUrl}`
        let options = {
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json' }
        }

        /* Request the viewing history from Netflix's API. */
        try {
            response = await fetch(url, options)
        } catch (error) {
            console.debug('[NVA Downloader] Fetch Error', error)
            continue
        }

        /* Convert the response body from JSON to an object
           and append each item to the history. */
        const responseObj = await response.json()
        const itemsName = (type === 'viewingactivity' ? 'viewedItems' : 'ratingItems')
        for (var y = 0; y < responseObj[itemsName].length; y++) {
            history.push(responseObj[itemsName][y])
        }

        /* Check how many records we got. If it's less than the set pageSize, we have
           reached the end of the history. */
        if (responseObj[itemsName].length < pageSize) {
            console.debug('[NVA Downloader] Stopping parsing, reached end of history.')
            break
        }

    }
    // Put the data into whale storage or sum
    await store(history);
    console.debug(`[NVA Downloader] Final history array has ${history.length} items.`)

    // Create a data uri with the json object embedded inside.
    let data = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(history))}`

}
/**
 * 
 * @param {Object[]} data 
 */
const store =
    (data) => {
        history = new localStorageDB("history", localStorage)
        if (history.isNew()) {
            history.createTableWithData(today, data)
            history.commit();
        }
    }
// Query them
class vizDataQuery {
    constructor(db) {
        this.db = db
    }
    /**
     * 
     * @param {*} input 
     * @param  {...any} options 
     */
    searchByName(input, ...options) {
        return this.db.queryAll(today, {
            query: { videoTitle: input, ...options }
        })
    }
    /**
     * 
     * @param {*} input 
     * @param  {...any} options 
     */
    searchBySeriesName(input, ...options) {
        return this.db.queryAll(today, {
            query: { seriesTitle: input, ...options }
        })
    }
    /**
     * 
     * @param {string[][]} input 
     * @param  {...JSON[]} options 
     */
    sortData(input, ...options) {
        return this.db.queryAll(today, {
            sort: input,
            query: { ...options }
        })
    }
}

// Render them into a billboard js graph
$('.secondary-navigation').prepend(
    `
            <div class="nav-element">
                <div class="netViz-graph">
                    <button href="/viewingactivity">
                    NetViz
                    </button>
                </div>
            </div>
            `
)
$('.account-secondary-navigation').prepend(
    `
            <div class="nav-element">
                <div class="netViz-graph">
                    <button>
                    NetViz
                    </button>
                </div>
            </div>
            `
)
$('.netViz-graph button').click(getHistoryData)