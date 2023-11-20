import React from 'react';
import moment from 'moment';

const NewsItem = (article, id) => (
    <li key={id} style={{listStyleType: "none", marginBottom: "20px"}}>
        <div style={{backgroundColor: "#171728", borderRadius: "5px", marginBottom: "10px"}}>
            {article.url && <a href={`${article.url}`}>
                <img src={article.image} style={{display: "block", margin: "auto", maxHeight: "180px"}}/>
            </a>}
        </div>
        <a href={`${article.link}`} style={{textDecoration: "none", fontSize: "1.2em", fontWeight: "bold"}}>
            {article.title}
        </a>
        <div dangerouslySetInnerHTML={{__html: article.content}}/>
        {/*<p>{article.content}</p>*/}
        <div style={{
            marginTop: 20
        }}>
            {article.author && <p style={{
                fontStyle: "italic"
            }}>{article.author}</p>}
            {article.creator && <p style={{
                fontStyle: "italic"
            }}>{article.creator}</p>}
            <p style={{
                textAlign: "right",
                fontStyle: "italic"
            }}>{moment(article.pubDate).fromNow()}</p>
        </div>
        <hr/>
    </li>
);

export const Articles = (props) => {

    return (
        <div className="container">
            <ul className="news-items" style={{padding: 0}}>
                {props.articles && props.articles.map((article, index) => NewsItem(article, index))}
            </ul>
        </div>
    )
}
