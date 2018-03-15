import React from 'react';
import Feed from 'rss-to-json';
// import Header from '../components.Header.jsx';
// import Footer from '../'
// import PodList from '../components/PodList.jsx'

class PodBox extends React.Component {
  constructor(props){
    super(props);
    this.podcasts = [];
    this.state = {
      feeds: [
      "http://rss.earwolf.com/comedy-bang-bang",
      "http://rss.earwolf.com/with-special-guest-lauren-lapkus"],
      podcasts: [],
      search:"",
    }
  }


  componentDidMount(){
    let allThePodcasts = [];
    this.state.feeds.forEach((feedUrl) => {
      Feed.load(feedUrl, function(err, rss){
        var podcast = {
          title: rss.title,
          description: rss.description,
          episodes: rss.items
        };
        allThePodcasts.push(podcast);
        console.log(allThePodcasts);
      });
    });
    this.setState({
      podcasts: allThePodcasts
    })
  };

  handleChange(event){
    var podSearch = event.target.value;
    this.setState({
      search: podSearch
    })
  };

  prepFeedSearch(searchString){
    var preppedSearch= searchString.replace(/\s/g, "+");
    return preppedSearch;
  };

  feedGetter(){
    var allTheFeeds = this.state.feeds;
    var urlSearch = this.prepFeedSearch(this.state.search);
    var url = "https://itunes.apple.com/search?term=" + urlSearch + "&entity=podcast/json";
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.addEventListener('load', ()=> {
      if(request.status === 200){
        var jsonString = request.responseText;
        var data = JSON.parse(jsonString);
        console.log(data);
        debugger;
        var newFeed = data.results.feedUrl;
        allTheFeeds.push(newFeed);}
    request.send();
    console.log(allTheFeeds);
    this.setState({
      feeds: allTheFeeds
    })
  })}


    render(){
      return(
        <div className='pod-box'>
        <input className='add-pod' onChange={this.handleChange.bind(this)}/>
        <button className='add-button' onClick={this.feedGetter.bind(this)}>Add Podcast</button>
        </div>
        )
    }

  }

  export default PodBox;