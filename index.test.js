import { expect } from "chai";

const URL = 'http://localhost:3001/';

describe('GET tasks', () => {
    it ('should get all tasks from db', async() => {
        const response = await fetch(URL);
        const data = await response.json();

        expect(response.status).to.equal(200);
        expect(data).to.be.an('array').that.is.not.empty;
        expect(data[0]).to.include.all.keys('id','description');
    })
})

describe('POST task', () => {
    it ('should post a task to db', async() => {
        const response = await fetch(URL + 'create',{
            method: 'post',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({'description':'Task from unit test'})
        })

        const data = await response.json();

        expect(response.status).to.equal(200);
        expect(data).to.be.an('object');
        expect(data).to.include.all.keys('id', 'description')
    })

    it ('should not POST a task with empty description', async() => {
        const response = await fetch(URL + 'create',{
            method: 'post',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({'description': null})
        })

        const data = await response.json();

        expect(response.status).to.equal(500);
        expect(data).to.be.an('object');
        expect(data).to.include.all.keys('error');
    })
})

describe('DELETE task', () => {
    it ('should delete a task from db', async() => {
        const response = await fetch(URL + 'delete/1', {
            method: 'delete'
        })
        const data = await response.json();

        expect(response.status).to.equal(200);
        expect(data).to.be.an('object');
        expect(data).to.include.all.keys('id');
    })

    it ('should not delete a task with SQL injection', async() => {
        const response = await fetch(URL + 'delete/id=0 or id>0',{
            method: 'delete'
        })
        const data = await response.json();

        expect(response.status).to.equal(500);
        expect(data).to.be.an('object');
        expect(data).to.include.all.keys('error');
    })
})