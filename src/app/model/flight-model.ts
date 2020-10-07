// Model stores flight data

export interface FlightModel {
    id: number;
    FlightCode: string,
    SeatsAvailable: number,
    OriginDestination: { 
        Origin: string, 
        Destination: string, 
        DeptDate: Date,
        ArrDate: Date
    },
    FareDetails: number
}
