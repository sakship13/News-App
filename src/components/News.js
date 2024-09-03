import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'

import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
        static defaultProps = {
          country:'in',
          pageSize: 8,
          category:'general',
        }
        static propTypes={
          country: PropTypes.string,
          pageSize: PropTypes.number,
          category:PropTypes.string,
        }
        capitalizeFirstLetter=(string)=> {
          return string.charAt(0).toUpperCase() + string.slice(1);
      }
  constructor(props){
    super(props);
    console.log("hello i am construtor from news component");
    this.state= {
      articles : [],
      loading : false ,
      page:1,
      totalResults : 0
    }
    document.title=`${this.capitalizeFirstLetter(this.props.category)}-NewsMonkey`;
  }
  async updateNews(){
    this.props.setProgress(10)
    const query = this.props.category; // Use the category prop as the search query
    const url = `http://api.mediastack.com/v1/news?access_key=2b92220c2f4322a9bc01fe5a6740acc0&keywords=${query}&countries=${this.props.country}&limit=${this.props.pageSize}&offset=${(this.state.page - 1) * this.props.pageSize}`;
   this.setState({ loading: true });

    try {
      let data = await fetch(url);
      this.props.setProgress(30)
      let parseData = await data.json();
      this.props.setProgress(70)
      this.setState({
        articles: parseData.data || [],
        
        totalResults: parseData.pagination ? parseData.pagination.total : 0,
        loading: false,
      });

    } catch (error) {
      console.error("Error fetching data:", error);
      this.setState({ loading: false });
    }
   this.props.setProgress(100)
  }
  async componentDidMount(){
    this.updateNews();
    }
  
  
    fetchMoreData = async() => {
      this.setState({ page: this.state.page + 1 });
      const query = this.props.category; // Use the category prop as the search query
      const url = `http://api.mediastack.com/v1/news?access_key=2b92220c2f4322a9bc01fe5a6740acc0&keywords=${query}&countries=${this.props.country}&limit=${this.props.pageSize}&offset=${(this.state.page - 1) * this.props.pageSize}`;
    this.setState({ loading: true });
  
      try {
        let data = await fetch(url);
        let parseData = await data.json();
        this.setState({
          articles: this.state.articles.concat(parseData.data || []), // Ensure concatenation with an array
          totalResults: parseData.pagination ? parseData.pagination.total : 0,
          loading: false,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        this.setState({ loading: false });
      }
    };
  
  render() {
   console.log("render")
    return (

    
      
      <> 
       <h1 className="text-center" style={{margin:'35px 0px'}}>NewsMonkey-Top {this.capitalizeFirstLetter(this.props.category)} headlines</h1>
        
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length < this.state.totalResults}
          loader={this.state.loading && <Spinner />}  
          endMessage={
            !this.state.loading && !this.state.hasMore && (
              <p style={{ textAlign: 'center' }}>
                <b>No more articles to display.</b>
              </p>
            )
          }

        >
          <div className="container">
           <div className="row">
            {this.state.articles.map((element)=>{
               return( <div className="col-md-4" key={element.url}>
            <NewsItem title={element.title} description={element.description} imageUrl={element.image} newsUrl={element.url} author={element.author}date={element.published_at} source={element.source} category={this.props.category}/>
            </div>)
        })}

        </div>
        </div>
        </InfiniteScroll>
        
       
      </>
    )
  }
}

export default News
