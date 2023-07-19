import React from "react";
import {Carousel} from "react-bootstrap";
import {Article} from "../../Article";

interface Props {
    currentArticle: Article
}

const ArticleImages = ({currentArticle}: Props) => {
    console.log(currentArticle)
    return (
        currentArticle.images.length > 0 ?
            <Carousel className={"article-images"}>
                {currentArticle.images.map(image =>
                    <Carousel.Item key={"article-image-" + image.identifier}>
                        <img className="d-block w-100"
                             src={"http://localhost:8080/images/" + image.identifier}
                             alt={image.title}
                        />
                        <Carousel.Caption>
                            <p>{image.description}</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                )}
            </Carousel>
            : <Carousel className={"article-images"}>
                <Carousel.Item>
                    <img className="d-block w-100"
                         src={"placeholder.jpg"}
                         alt={"image"}
                    />
                </Carousel.Item>
            </Carousel>
    )
}

export default ArticleImages