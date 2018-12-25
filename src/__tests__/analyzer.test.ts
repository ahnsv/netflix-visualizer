import { expect } from 'chai';
import { ViewData } from '../analyzer'
import { ContentData } from './../model';

describe('analyzer', () => {
    let test = new ViewData('./viewedHistory.json')
    beforeEach(() => {
        test.getResource(test.data, test.path)
    });
    it('Getting resources right', () => {
        expect(test.data).to.have.deep.property('title')
    })
    it('Get title value', () => {
        expect(test.getValue(test.data[0], "title"))
    })
})