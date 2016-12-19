process.env.NODE_ENV = 'test';
process.env.MONGODB_URI = 'mongodb://localhost:27017/marvel';
var mongoose = require("mongoose");
var Comment = require('../server/models/comment');

var chai = require('chai');
var chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

//mongoose.connect(process.env.MONGODB_URI);
chai.use(chaiHttp);

describe('Comments', function() {
    beforeEach(function(done){ //Before each empty the database
        Comment.remove({}, function(err) {
           done();
        });
    });

    //test GET Comment
    describe('/GET comment', function() {
        it('it should GET all the comments', function(done){
          chai.request(server)
              .get('/api/characters/comments/1011334')
              .end(function(err, res){
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.be.eql(0);
                done();
              });
        });
    });

    //test POST comment
    describe('/POST comment', function() {
      it('it should POST a comment', function(done) {
            var comment = {
                characterId:1011334,
                name:'Qing',
                message:'This is awesome!',
                updated:'Sun Dec 18 2016 12:37:16 GMT-0800 (PST)',
            };
            chai.request(server)
                .post('/api/characters/comments/1011334')
                .send(comment)
                .end(function(err, res){
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success').eql('new comment was saved!');
                    res.body.should.have.property('data');
                  done();
                });
          });
      });

      //test Delete comment
      describe('/DELETE comment', function() {
          it('it should DELETE a comment given the comment index', function(done) {
            var comment = new Comment ({
                characterId:1011334,
                name:'Qing',
                message:'This is awesome!',
                updated:'Sun Dec 18 2016 12:37:16 GMT-0800 (PST)',
            });
            comment.save(function(err, comment) {
                    chai.request(server)
                    .delete('/api/characters/comments/1011334?commentIdx=' + comment._id)
                    .end(function(err, res) {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('success').eql('comment was deleted!');
                      done();
                    });
              });
          });
      });

});
