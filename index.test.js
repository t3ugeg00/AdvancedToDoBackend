import { expect } from "chai";
import { initializeTestDb, insertTestUser, getToken } from "./helper/test.js";

const URL = 'http://localhost:3001/';

describe('GET tasks', () => {
    before(() => {
        initializeTestDb();
    })

    it ('should get all tasks from db', async() => {
        const response = await fetch(URL);
        const data = await response.json();

        expect(response.status).to.equal(200);
        expect(data).to.be.an('array').that.is.not.empty;
        expect(data[0]).to.include.all.keys('id','description');
    })
})

describe('POST task', () => {
    const email = 'login@example.com';
    const password = 'loginTest123';

    insertTestUser(email, password);
    const token = getToken(email);
    it ('should post a task to db', async() => {
        const response = await fetch(URL + 'create',{
            method: 'post',
            headers: {
                'Content-Type':'application/json',
                Authorization: token
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
                'Content-Type':'application/json',
                Authorization: token
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
    const email = 'login@example.com';
    const password = 'loginTest123';

    insertTestUser(email, password);
    const token = getToken(email);
    it ('should delete a task from db', async() => {
        const response = await fetch(URL + 'delete/1', {
            method: 'delete',
            headers:{
                Authorization: token
            }
        })
        const data = await response.json();

        expect(response.status).to.equal(200);
        expect(data).to.be.an('object');
        expect(data).to.include.all.keys('id');
    })

    it ('should not delete a task with SQL injection', async() => {
        const response = await fetch(URL + 'delete/id=0 or id>0',{
            method: 'delete',
            headers:{
                Authorization: token
            }
        })
        const data = await response.json();

        expect(response.status).to.equal(500);
        expect(data).to.be.an('object');
        expect(data).to.include.all.keys('error');
    })
})

describe('POST register', () => {
    const email = 'register@example.com';
    const password = 'testRegister123';
    
    it ('should register with valid email and password', async() => {
        const response = await fetch(URL + 'user/register',{
            method: 'post',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({'email': email, 'password': password})
        })

        const data = await response.json();

        expect(response.status).to.equal(201, data.error);
        expect(data).to.be.an('object');
        expect(data).to.include.all.keys('id', 'email');
    })
})

describe('POST login', () => {
    const email = 'login@example.com';
    const password = 'loginTest123';

    insertTestUser(email, password);

    it('should login with valid credentials', async() => {
        const response = await fetch(URL + 'user/login',{
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'email': email, 'password': password})
        })

        const data = await response.json();

        expect(response.status).to.equal(200, data.error);
        expect(data).to.be.an('object');
        expect(data).to.include.all.keys('id', 'email', 'token');
    })
})