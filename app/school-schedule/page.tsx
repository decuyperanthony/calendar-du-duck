import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { SimpleCard } from "@/components/common/simple-card";

const scheduleData = [
  { courseTime: "8h00", arrivalTime: "7h58", label: "Cours" },
  { courseTime: "8h58", arrivalTime: "8h56", label: "Cours" },
  { courseTime: "10h08", arrivalTime: "10h06", label: "Cours" },
  { courseTime: "11h06", arrivalTime: "11h04", label: "Cours" },
  { courseTime: "12h01", arrivalTime: "11h59", label: "Pause déjeuner" },
  { courseTime: "12h59", arrivalTime: "12h57", label: "Reprise des cours" },
  { courseTime: "13h31", arrivalTime: "13h29", label: "Cours" },
  { courseTime: "14h29", arrivalTime: "14h27", label: "Cours" },
  { courseTime: "15h39", arrivalTime: "15h37", label: "Cours" },
  { courseTime: "16h37", arrivalTime: "16h35", label: "Cours" },
  { courseTime: "17h32", arrivalTime: "17h30", label: "Fin des cours" },
];

const Page = () => {
  return (
    <SimpleCard
      title="Emploi du Temps Scolaire"
      className="w-full max-w-2xl mx-auto"
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Heure de Cours</TableHead>
            <TableHead>Heure d&apos;Arrivée</TableHead>
            <TableHead>Label</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {scheduleData.map(({ courseTime, arrivalTime, label }, index) => (
            <TableRow key={`school-schedule__s${index}__${arrivalTime}`}>
              <TableCell>{courseTime}</TableCell>
              <TableCell>{arrivalTime}</TableCell>
              <TableCell>{label}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </SimpleCard>
  );
};

export default Page;
