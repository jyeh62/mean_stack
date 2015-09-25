module.exports = {
  db: 'mongodb://localhost/mean-book',
  sessionSecret: 'developmentSessionSecret',
  facebook: {
    clientID: '126340837721012',
    clientSecret: '57892478dc6a137d7d6e5130ef143e9c',
    callbackURL: 'http://localhost:3000/oauth/facebook/callback'
    },
  twitter: {
    clientID: 'r91miunYd9a3SNpfDbL75xxZX',
    clientSecret: 'SWWOiRGJ8Xxy2UUKDG2xeHTXyZxQlwXZzLLfeJaDdaj76Z17hl',
    callbackURL: 'http://localhost:3000/oauth/twitter/callback'
    }
};
