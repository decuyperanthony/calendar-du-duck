import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { SimpleCard } from "@/components/common/simple-card";
import { useScoped18n } from "@/lib/next-intl";

import scheduleData from "@/data/school-schedule.json";

const Page = () => {
  const t = useScoped18n("school-schedule");

  return (
    <SimpleCard title={t("arrival-hour")} className="w-full max-w-2xl mx-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t("class")}</TableHead>
            <TableHead>{t("arrival")}</TableHead>
            <TableHead>{t("title")}</TableHead>
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
