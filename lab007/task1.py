from typing import Set, List

class Passenger:
    def __init__(
        self,
        name: str,
        ticket_number: int,
        start_station: str,
        end_station: str,
    ) -> None:
        self.name: str = name
        self.ticket_number: int = ticket_number
        self.start_station: str = start_station
        self.end_station: str = end_station

    def __repr__(self) -> str:
        return f"Passenger({self.name!r}, {self.ticket_number}, {self.start_station!r}, {self.end_station!r})"

class Station:
    def __init__(
        self,
        name: str,
        passengers: Set[Passenger],
    ) -> None:
        self.name: str = name
        self.passengers: Set[Passenger] = passengers

    def arrive(self, arriving_passengers: Set[Passenger]) -> None:
        self.passengers = self.passengers.union(arriving_passengers)

    def depart(self, train_station_names: List[str]) -> Set[Passenger]:
        departing_passengers: Set[Passenger] = set()
        for passenger in self.passengers:
            if passenger.end_station in train_station_names:
                departing_passengers.add(passenger)
        self.passengers -= departing_passengers
        return departing_passengers

class Train:
    def __init__(
        self,
        identifier: str,
        stations: List[Station],
        passengers: Set[Passenger],
    ) -> None:
        self.identifier: str = identifier
        self.stations: List[Station] = stations
        self.passengers: Set[Passenger] = passengers

    def embark(self, departing_passengers: Set[Passenger]) -> None:
        self.passengers = self.passengers.union(departing_passengers)

    def disembark(self) -> Set[Passenger]:
        disembarking: Set[Passenger] = set()
        for passenger in self.passengers:
            if passenger.end_station == self.stations[0].name:
                disembarking.add(passenger)
        self.passengers -= disembarking
        return disembarking

    def move(self) -> None:
        print(f"\n[INFO] Дараагийн буудал: {self.stations[0].name}")
        self.stop()

    def stop(self) -> None:
        print(f"[STOP] {self.stations[0].name} буудалд ирлээ.")

        arriving: Set[Passenger] = self.disembark()
        if arriving:
            print("Бууж буй зорчигчид:")
            for p in arriving:
                print(f" - {p.name}")
        self.stations[0].arrive(arriving)

        departing: Set[Passenger] = self.stations[0].depart(self.get_station_names())
        if departing:
            print("Сууж буй зорчигчид:")
            for p in departing:
                print(f" - {p.name}")
        self.embark(departing)

        self.stations.pop(0)
        self.print_passengers()

        if self.stations:
            self.move()
        else:
            print("Энэ галт тэрэг эцсийн буудалдаа хүрлээ. Та бүхэн бууна уу!")

    def get_station_names(self) -> List[str]:
        return [station.name for station in self.stations]

    def print_passengers(self) -> None:
        if not self.passengers:
            print("Одоогоор галт тэргэнд зорчигч алга.")
        else:
            print("Галт тэргэнд зорчиж буй зорчигчид:")
            for passenger in self.passengers:
                print(f" - {passenger.name}")
import sys
import io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

if __name__ == "__main__":
    p1 = Passenger("Бат", 1, "Баруун 4", "BZH дүүрэг")
    p2 = Passenger("Сүх", 2, "Их дэлгүүр", "BZH дүүрэг")
    p3 = Passenger("Марал", 3, "Талбай", "BZH дүүрэг")

    s1 = Station("Баруун 4", {p1})
    s2 = Station("Их дэлгүүр", {p2})
    s3 = Station("Талбай", {p3})
    s4 = Station("BZH дүүрэг", set())

    train = Train("S3 - Ulaanbaatar line", [s1, s2, s3, s4], set())
    train.move()
