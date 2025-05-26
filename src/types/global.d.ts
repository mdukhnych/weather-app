interface ICity {
  name: string,
  state: string,
  country: string,
  lat: number,
  lon: number,
  localName: Record<string, string>
}

interface IUser {
  uid: string,
  name: string,
  citiesList: ICity[]
}