import {FileType} from './FileType'
import {LocationType} from './LocationType'

export type Log = {
    title: string,
    description: string,
    files: Array<FileType>,
    location: LocationType,
    date: string,
    hide: boolean
}