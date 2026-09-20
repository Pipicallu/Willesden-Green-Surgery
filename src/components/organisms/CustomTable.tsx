import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";

export interface TableCellData {
  value: string;
  href?: string;
}

export interface CustomTableProps {
  caption?: string;
  headings: string[];
  rows: (string | TableCellData)[][];
  footer?: (string | TableCellData)[];
}

function renderCell(cell: string | TableCellData) {
  if (typeof cell === "string") return cell;
  return cell.href ? (
    <a
      href={cell.href}
      className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
    >
      {cell.value}
    </a>
  ) : (
    cell.value
  );
}

export function CustomTable({
  caption,
  headings,
  rows,
  footer,
}: CustomTableProps) {
  // console.log("CustomTable props:", { caption, headings, rows, footer });
  return (
    <Table>
      {caption && <TableCaption>{caption}</TableCaption>}
      <TableHeader>
        <TableRow>
          {headings.map((heading) => (
            <TableHead key={heading}>{heading}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row, rowIndex) => (
          <TableRow key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <TableCell key={cellIndex}>{renderCell(cell)}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
      {footer && (
        <TableFooter>
          <TableRow>
            {footer.map((cell, cellIndex) => (
              <TableCell key={cellIndex}>{renderCell(cell)}</TableCell>
            ))}
          </TableRow>
        </TableFooter>
      )}
    </Table>
  );
}
