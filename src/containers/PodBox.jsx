import React from 'react';
import Feed from 'rss-to-json';
// import Header from '../components.Header.jsx';
// import Footer from '../'
import PodList from '../components/PodList.jsx'

class PodBox extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      feeds: [],
      podcasts: [],
      search: null
    }
    this.handleChange = this.handleChange.bind(this);
    this.feedGetter = this.feedGetter.bind(this);
    this.podGetter = this.podGetter.bind(this);
  }


  podGetter(){
    console.log('podgetter ACTIVATE');
    let allThePodcasts = [];
    this.state.feeds.forEach((feedUrl) => {
      console.log('this is happening');
      Feed.load(feedUrl, function(err, rss){
        var podcast = {
          title: rss.title,
          description: rss.description,
          episodes: rss.items
        };
        allThePodcasts.push(podcast);
      });
    });
    this.setState({
      podcasts: allThePodcasts
    })
    console.log(this.state.podcasts);
  };

  handleChange(event){
    var podSearch = event.target.value;
    this.setState({search: podSearch})
  };

  prepFeedSearch(searchString){
    var preppedSearch= searchString.replace(/\s/g, "+");
    return preppedSearch;
  };

  feedGetter(){
    var urlSearch = this.prepFeedSearch(this.state.search);
    var url = "https://itunes.apple.com/search?term=" + urlSearch + "&entity=podcast";
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.addEventListener('load', ()=> {
      if(request.status === 200){
        var jsonString = request.responseText;
        var data = JSON.parse(jsonString);
        var newFeed = data.results[0].feedUrl;
        var updatedFeeds = this.state.feeds.concat([newFeed]);
        this.setState({
          feeds: updatedFeeds
        })}
        this.podGetter();
      });
      request.send();
    }


    render(){
      return(
        <div className='pod-box'>
          <input className='add-pod' onChange={this.handleChange}/>
          <button className='add-button' onClick={this.feedGetter}>Add Podcast</button>
          <PodList podcasts={this.state.podcasts}/>
        </div>
      )
    }

  }

  export default PodBox;
