[
  '{{repeat(51)}}',
  {
    _id: '{{objectId()}}',
    firstName: '{{firstName()}}',
    lastName: '{{surname()}}',
    birthDay: '{{moment(this.date(new Date(1955,0,1), new Date(2004,11,31))).format("L")}}',
    company: '{{company()}}',
    groups: ['{{repeat(1,3)}}', '{{random("work", "family", "friends", "business")}}'
    ],
    created: '{{moment(this.date(new Date(2010,0,1), new Date())).format()}}',
    modified: function(){
      return this.created;
    },
    phones: ['{{repeat(2,3)}}',
      function(tags, parent, index) {
        var type;
        if(index === 0)
          type = 'mobile';
        else if(index === 1)
          type = 'work';
        else
          type = 'home';
        return {
          type: type,
          phone: tags.phone()
        };
      }],
    emails: ['{{repeat(1,2)}}',
      function(tags, parent, index) {
        var type, name, company;
        if(index === 0) {
          type = 'work';
          name = this.firstName + '.' + this.lastName;
          company = this.company;
        }
        else {
          type = 'home';
          name = tags.lorem(1, 'words');
          company = tags.company();
        }
        return {
          type: type,
          email: (name + '@' + company + tags.random('.com', '.org', '.net')).toLowerCase()
        };
      }],
    addrs: ['{{repeat(0,2)}}',
      function(tags, parent, index) {
        var type;
        if(index === 0)
          type = 'home';
        else
          type = 'work';
        return {
          type: type,
          street: tags.integer(10, 9999) + ' ' + tags.street(),
          city: tags.city(),
          state: tags.state(),
          zip: (tags.integer(11111, 99999)).toString()
        };
      }],
    notes: function(tags) {
      var rand = tags.random(0,1,2);
      if(rand === 0)
        return '';
      else if(rand === 1)
        return tags.lorem(1, 'sentences');
      else if(rand === 2)
        return tags.lorem(1, 'sentences')  + '\n' + tags.lorem(1, 'sentences');
    }


  }]