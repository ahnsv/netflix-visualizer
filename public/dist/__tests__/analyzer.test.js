import { expect } from 'chai';
import { ViewData } from '../analyzer';
import fs from 'fs';
describe('analyzer', function () {
    var res = JSON.parse(fs.readFileSync("viewedHistory.json", "utf8"));
    var test = new ViewData(res);
    it('Getting resources right', function () {
        expect(test.data).to.have.property('title');
    });
    it('Get title value', function () {
        expect(test.getValue(test.data[0], "title"));
    });
});
