import { ILocation } from '../model/ILocation'
import { IState } from '../model/IState'
import { IWeather } from '../model/IWeather'

// prettier-ignore
export const selectLocations = (state: IState): ReadonlyArray<ILocation> => state.locations
// prettier-ignore
export const selectLocation = (state: IState): ILocation | null => state.locations[state.locationIndex] || null
// prettier-ignore
export const selectLocationIndex = (state: IState): number => state.locationIndex
// prettier-ignore
export const selectWeather = (state: IState): IWeather | null => state.weather
// prettier-ignore
export const selectTimestamp = (state: IState): number => state.timestamp
