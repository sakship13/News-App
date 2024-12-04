import React from 'react'

const NewsItem =(props)=> {
 
    let {title,description,imageUrl,newsUrl,author,date,source,category} = props;
    const defaultImages = {
      general: "https://via.placeholder.com/1200x675?text=General+News",
      business: "https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fG5ld3N8ZW58MHx8MHx8fDA%3D",
      entertainment: "https://via.placeholder.com/1200x675?text=Entertainment+News",
      health: "https://via.placeholder.com/1200x675?text=Health+News",
      science: "https://via.placeholder.com/1200x675?text=Science+News",
      sports: "https://via.placeholder.com/1200x675?text=Sports+News",
      technology: "https://picsum.photos/1200/675?random=1"
    };
    const defaultImage = defaultImages[category] || "https://example.com/default-general.jpg";
    const maxLength = 100; // You can change this to any desired length
    const trimmedDescription = description
      ? description.length > maxLength
        ? description.substring(0, maxLength) + "..."
        : description
      : "";

    return (
       
      <div className="my-3">
        <div className="card" >
          <div style={{display:'flex',justifyContent:'flex-end',position:'absolute',right:'0'}}>
        <span className=" badge rounded-pill bg-danger">{source ?source.split('|')[0].trim() : ''}</span>
        </div>
            <img src={ imageUrl || defaultImage} className="card-img-top" alt="..."/>
                <div className="card-body">
              <h5 className="card-title">{title}...</h5>
            <p className="card-text">{trimmedDescription}...</p>
            <p className="card-text"><small class="text-body-secondary">By {!author?"Unknown":author} On {new Date(date).toGMTString()}</small></p>
          <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-dark btn-sm btn-primary">Read More</a>
             </div>
         </div>
      </div>
    )
 
}

export default NewsItem
