import { select, settings } from './settings.js';
import Songs from './components/Songs.js';
import Search from './components/Search.js';
import Discover from './components/Discover.js';

const app = {
  initPage: function(){
    const thisApp = this;
    
    thisApp.pages = document.querySelector(select.containerOf.pages).children;
    thisApp.navLinks = document.querySelectorAll(select.nav.links);
    
    let pageMatchingHash = thisApp.pages[0].id;

    let idFromHash = window.location.hash.replace('#/','');
    for( let page in thisApp.pages){
      if(page.id == idFromHash){
        pageMatchingHash = page.id;
        break;
      }
    }
    thisApp.activatePage(pageMatchingHash);

    for( let link of thisApp.navLinks){
      link.addEventListener('click', function(event){
        const clickedElement = this;
        event.preventDefault();
        
        const id = clickedElement.getAttribute('href').replace('#','');
        
        thisApp.activatePage(id);
        if(id=='discover'){
          document.querySelector(select.containerOf.discoverBox).innerHTML ='';
          new Discover(thisApp.data.songs);
          
        }
        window.location.hash = '#/' + id;
      });
    }
    

  },

  activatePage: function(pageId){
    const thisApp = this;
    
    /* add class 'active' to matching page, remove from notmtchng*/
    for(let page of thisApp.pages){
      
      page.classList.toggle('active', page.id == pageId);

     
    }

    /* add class 'active' to matching links, remove from notmtchng*/
    for(let link of thisApp.navLinks){

      link.classList.toggle('active', link.getAttribute('href') == '#' + pageId);
     
    }
  },

  initMenu: function(){
    const thisApp = this;
        
    for(let songData in thisApp.data.songs){
      new Songs(thisApp.data.songs[songData].id , thisApp.data.songs[songData]);
      
    }
    
  },

  initData: function(){
    const thisApp = this;

    thisApp.data = {};
    const url = settings.db.url + '/' + settings.db.songs;
    
    fetch(url)

      .then(function(rawResponse){
        return rawResponse.json();
      })
      .then(function(parsedResponse){
        thisApp.data.songs = parsedResponse;

        thisApp.initMenu(); 
        app.initGreenAudioPlayer();
      });
  },
  

  initGreenAudioPlayer: function(){

    //new GreenAudioPlayer('.gap-example');

    GreenAudioPlayer.init({
      selector: '.player', // inits Green Audio Player on each audio container that has class "player"
      stopOthersOnPlay: true
    });

  },
  initButtonSearch: function(){
    const buttonSearch = document.querySelector(select.button.search);
    const songName = document.querySelector(select.button.songName);
    let songNameHolder = 'nic';

    buttonSearch.addEventListener('click', function(){
      songNameHolder = songName.value;

      app.initSearch(songNameHolder);  
    });
   
  },
  initSearch(songNameHolder){
    
    new Search(songNameHolder);
  },

  lowerCasetoUper: function(){
    const elements = document.querySelectorAll('h1 , h2 ,h3 ,h4');
    for(let element  of elements){
      
      let text = element.innerHTML;
     
      element.innerHTML =text.toUpperCase();
      
    }
  }

};
app.lowerCasetoUper();
app.initData();
app.initPage();
app.initButtonSearch();
