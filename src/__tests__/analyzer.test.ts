import { expect } from 'chai';
import { ViewData } from '../analyzer'
import { ContentData } from './../model';
import fs from 'fs'

describe('analyzer', () => {
    let res: ContentData[] = JSON.parse(fs.readFileSync("viewedHistory.json", "utf8"))
    let test = new ViewData(res)
    it('Getting resources right', () => {
        expect(test.data).to.have.deep.property('title')
    })
    it('Get title value', () => {
        expect(test.getValue(test.data[0], "title"))
    })
})