export class Place {
    id: number
    name: string = ""
    pos: { lat: number, lng: number } = {lat: 0, lng: 0}
    area: Array<{ lat: number, lng: number }> = []
    type: string = ""
    article: number = -1
    identifier: string = ""
    zoom: number = 10
    region: number | null = null
    prefecture: number | null = null
    city: number | null = null


    public constructor(
        id: number = -1,
        name: string = "",
        pos: { lat: number, lng: number } = {lat: 0, lng: 0},
        area: Array<{ lat: number, lng: number }> = [],
        type: string = "",
        article: number = -1,
        identifier: string = "",
        zoom: number = 10,
        region: number | null = null,
        prefecture: number | null = null,
        city: number | null = null
    ) {
        this.id = id
        this.name = name
        this.pos = pos
        this.area = area
        this.type = type
        this.article = article
        this.identifier = identifier
        this.zoom = zoom
        this.region = region
        this.prefecture = prefecture
        this.city = city
    }
}