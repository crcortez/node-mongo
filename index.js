const MongoClient = require('mongodb').MongoClient;
const assert = require('assert').strict;
const dboper = require('./operations');

const url = 'mongodb://localhost:27017/';
const dbname = 'nucampsite';


MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {

    assert.strictEqual(err, null);

    console.log('Connected correctly to server');

    const db = client.db(dbname);

    db.createCollection('campsites')

    db.dropCollection('campsites', (err, result) => {
        assert.strictEqual(err, null);
        console.log('Dropped Collection', result);

       // const collection = db.collection('campsites');

        dboper.insertDocument(db, {name: "Breadcrumb Trail Campground", description: "Test"},
        'campsites', result => {

        
       /* (err, result) => {
            assert.strictEqual(err, null);
            console.log('Insert Document:', result.ops);

            collection.find().toArray((err, docs) => {
                assert.strictEqual(err, null); */

                console.log('Insert Document:', result.ops);

                dboper.findDocuments(db, 'campsites', docs => {
                    console.log('Found Documents:', docs);
                
                    dboper.updateDocument(db, { name: "Breadcrumb Trail Campground" },
                        { description: "Updated Test Description"}, 'campsites',
                        result => {
                            console.log('Updated Document Count:', result.result.nModified);

                            dboper.findDocuments(db, 'campsites', docs => {
                                console.log('Found Documents:', docs);

                                dboper.removeDocument(db, { name: "Breadcrumb Trail Campground" },
                                    'campsites', result => {
                                        console.log('Delete Document Count:', result.deletedCount);
                                        
                                        client.close();
                                    }
                                );
                            });
                        }
                    );
                });
            });
        });
    });