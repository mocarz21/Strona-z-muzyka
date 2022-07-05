export const select = {
  templateOf: {
    playerBox: '#template-player'

  },
  containerOf:{
    player: '.songs',
    pages: '#pages',
    searchBox: '.search-wrapper > .songs',
    discoverBox: '.discover-wrapper > .songs'
  },
  nav: {
    links: '.main-nav a'
  },
  button: {
    search: '.submit-search',
    songName: '.song-name'
  }
};


export const settings = {
  db: {
    url: '//localhost:3131',
    songs: 'songs',
    searchName: 'title=',
    searchId: 'id='
    
  }
};

export const templates = {
  playerBox: Handlebars.compile(document.querySelector(select.templateOf.playerBox).innerHTML)

};