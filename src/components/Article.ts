import {Place} from "./Place";

export class PlaceReference {
    reference: string = "" // {{placeholder}}
    text: string = ""
    place: Place;

    public constructor(
        reference: string = "{}",
        text: string = "",
        place: Place
    ) {
        this.reference = reference
        this.text = text
        this.place = place
    }
}

class Image {
    id: number
    title: string = ""
    identifier: string = ""
    description: string = ""

    public constructor(
        id = -1,
        title: string = "",
        identifier: string = "",
        description: string = ""
    ) {
        this.id = id
        this.title = title
        this.identifier = identifier
        this.description = description
    }
}

export class Article {
    id: number
    title: string = ""
    subtitle: string = ""
    content: string = ""
    placeReferences: Array<PlaceReference> = []
    place: Place | null
    ranking: number | null
    images: Array<Image> = []

    public constructor(
        id: number,
        title: string = "",
        subtitle: string = "",
        content: string = "",
        placesReference: Array<PlaceReference> = [],
        place: Place | null = null,
        ranking: number | null = null,
        images: Array<Image> = []
    ) {
        this.id = id
        this.title = title
        this.subtitle = subtitle
        this.content = content
        this.placeReferences = placesReference
        this.place = place
        this.ranking = ranking
        this.images = images
    }
}

