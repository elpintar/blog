

/*
  format of a blog entry:
  "html-page-name": {
    blogId: "html-page-name", // added automatically
    title: "Dreams Have Gravity",
    date: new Date("December 25, 1993"),
    tags: ["art", "stories"],
  }
*/

var blogMap = {
  'dreams-have-gravity': {
    title: "Dreams Have Gravity",
    subtitle: 'A Life Story Told Through Nightmares',
    date: new Date("January 18, 2013"),
    tags: ["art", "stories"],
  },
  'words': {
    title: "Words",
    date: new Date("January 19, 2014"),
    tags: ["art"],
  },
  'god-of-angel-armies': {
    title: 'God of Angel Armies: Sign Language Music Video',
    date: new Date("April 20, 2014"),
    tags: ["art", "stories"],
  },
  'overwhelmed-in-college': {
    title: 'How to Deal With Being Overwhelmed in College',
    subtitle: 'A Monologue for Carnegie Mellon Students',
    date: new Date("9/7/2015"),
    tags: ["prose"],
  },
  'jesus-only-jesus': {
    title: 'Jesus, Only Jesus: Sign Language Music Video',
    date: new Date("6/19/16"),
    tags: ["art", "stories"],
  },
  'deaf-school-india': {
    title: 'My Deafness, A Deaf School in India, and an Undocumented Sign Language',
    subtitle: 'Say No To Your Dream And Say Yes To The Dreams of Those You Can Make Possible',
    date: new Date("7/28/2015"),
    tags: ["stories"]
  },
  'family-stories': {
    title: 'Family Stories',
    date: new Date("7/05/2016"),
    tags: ["stories"]
  },
  'tourism-is-vain': {
    title: 'Tourism is Vain; Travel brings Pain',
    subtitle: 'Lessons Learned from 107 Days of Traveling',
    date: new Date("9/18/2016"),
    tags: ["prose"]
  },
  'why-I-am-becoming-Catholic': {
    title: 'Why I Am Becoming Catholic',
    subtitle: 'by Erik Pintar',
    date: new Date("4/7/2017"),
    tags: ["stories", "prose"],
    editors: ["Angela Pintar", "Chris Hsu", "Rachel Poole"],
  },
  '12-reasons-why': {
    title: '12 Reasons Why I Am Grateful To Have Become Catholic',
    date: new Date("1/21/2019"),
    tags: ["prose"],
  },
  'what-does-it-mean-to-grow-up': {
    title: "What Does it Mean to Grow Up?",
    subtitle: "A 'First Lecture' Given at Carnegie Mellon",
    date: new Date("4/13/2016"),
    tags: ["prose"],
  },
}

var tags = ["prose", "stories", "art"];

for (var blogId in blogMap) {
  // make blogId also a parameter of each object
  blogMap[blogId].blogId = blogId;
  // get list of all tags found in blogs
  for (var i = 0; i < blogMap[blogId]["tags"].length; i++) {
    var tag = blogMap[blogId]["tags"][i];
    if (tags.indexOf(tag) === -1) {
      tags.push(tag);
    }
  }
}

