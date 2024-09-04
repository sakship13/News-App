import React, { useEffect,useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'

import InfiniteScroll from "react-infinite-scroll-component";

const News =(props)=>{
      const [articles,setArticles]=useState([]);
      const [page,setPage]=useState(1);
      const [loading,setLoading]=useState(true);
      const [totalResults,setTotalResults]=useState(0);
      // document.title=`${capitalizeFirstLetter(props.category)}-NewsMonkey`;
        const capitalizeFirstLetter=(string)=> {
          return string.charAt(0).toUpperCase() + string.slice(1);
      }

 const updateNews= async()=>{
    props.setProgress(10)
    const query = props.category; // Use the category prop as the search query
    const url = `http://api.mediastack.com/v1/news?access_key=2b92220c2f4322a9bc01fe5a6740acc0&keywords=${query}&countries=${props.country}&limit=${props.pageSize}&offset=${(page - 1) * props.pageSize}`;
   setLoading(true);

    try {
      let data = await fetch(url);
      props.setProgress(30)
      let parseData = await data.json();
      props.setProgress(70)
      setArticles( parseData.data);
      setTotalResults( parseData.pagination.total);
      setLoading(false);

    } catch (error) {
      console.error("Error fetching data:", error);
     setLoading(false);
    }
   props.setProgress(100)
  }
  useEffect(()=>{
    updateNews();
  },[])
  
  
  
   const fetchMoreData = async() => {
      setPage(page + 1 );
      const query = props.category; // Use the category prop as the search query
      const url = `http://api.mediastack.com/v1/news?access_key=2b92220c2f4322a9bc01fe5a6740acc0&keywords=${query}&countries=${props.country}&limit=${props.pageSize}&offset=${(page - 1) * props.pageSize}`;
    setLoading(true);
  
      try {
        let data = await fetch(url);
        let parseData = await data.json();
        setArticles(articles.concat(parseData.data));
        setTotalResults(parseData.pagination.total);
        setLoading(false);

       
      } catch (error) {
        console.error("Error fetching data:", error);
       setLoading(false);
      }
    };
  
  
    return (

    
      
      <> 
       <h1 className="text-center" style={{margin:'35px 0px', marginTop:'90px'}}>NewsMonkey-Top {capitalizeFirstLetter(props.category)} headlines</h1>
        
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length < totalResults}
          loader={loading && <Spinner />}  
          // endMessage={
          //   !loading && !hasMore && (
          //     <p style={{ textAlign: 'center' }}>
          //       <b>No more articles to display.</b>
          //     </p>
          //   )
          // }

        >
          <div className="container">
           <div className="row">
            {articles.map((element)=>{
               return( <div className="col-md-4" key={element.url}>
            <NewsItem title={element.title} description={element.description} imageUrl={element.image} newsUrl={element.url} author={element.author}date={element.published_at} source={element.source} category={props.category}/>
            </div>)
        })}

        </div>
        </div>
        </InfiniteScroll>
        
       
      </>
    )
 
}
News.defaultProps = {
  country:'in',
  pageSize: 8,
  category:'general',
}
News.propTypes={
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category:PropTypes.string,
}
export default News
