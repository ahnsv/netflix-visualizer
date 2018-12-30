const scripts = [
    'lib/billboard.min.js',
    'lib/jquery-3.3.1.min.js',
    'lib/localstoragedb.min.js',
    'lib/underscore-min.js'
]

for (var i = 0; i < scripts.length; i++) {
    let script = document.createElement('script')
    script.src = chrome.extension.getURL(scripts[i]);
    document.body.appendChild(script)
}

setTimeout(() => {
    let script = document.createElement('script')
    script.src = chrome.extension.getURL('netViz.js');
    document.body.appendChild(script)
}, 200)