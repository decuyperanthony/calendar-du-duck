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

const Page = () => {
  const t = useScoped18n("school-schedule");

  const schedules = [
    { courseTime: t("schedules.1.courseTime"), arrivalTime: t("schedules.1.arrivalTime"), label: t("schedules.1.label") },
    { courseTime: t("schedules.2.courseTime"), arrivalTime: t("schedules.2.arrivalTime"), label: t("schedules.2.label") },
    { courseTime: t("schedules.3.courseTime"), arrivalTime: t("schedules.3.arrivalTime"), label: t("schedules.3.label") },
    { courseTime: t("schedules.4.courseTime"), arrivalTime: t("schedules.4.arrivalTime"), label: t("schedules.4.label") },
    { courseTime: t("schedules.5.courseTime"), arrivalTime: t("schedules.5.arrivalTime"), label: t("schedules.5.label") },
    { courseTime: t("schedules.6.courseTime"), arrivalTime: t("schedules.6.arrivalTime"), label: t("schedules.6.label") },
    { courseTime: t("schedules.7.courseTime"), arrivalTime: t("schedules.7.arrivalTime"), label: t("schedules.7.label") },
    { courseTime: t("schedules.8.courseTime"), arrivalTime: t("schedules.8.arrivalTime"), label: t("schedules.8.label") },
    { courseTime: t("schedules.9.courseTime"), arrivalTime: t("schedules.9.arrivalTime"), label: t("schedules.9.label") },
  ];

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
          {schedules.map(({ courseTime, arrivalTime, label }, index) => (
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
