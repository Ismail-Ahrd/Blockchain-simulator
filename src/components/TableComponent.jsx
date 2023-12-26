import React, { useMemo } from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Spinner, getKeyValue} from "@nextui-org/react";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const API_URL = "http://localhost:8080"

export default function App() {
  const [page, setPage] = React.useState(1);

  const trim=(ch)=>{
    if(ch.length>=40){
      return ch.substring(0,40)+"..."
    }
    else return ch;
  }

  const {data, isLoading,mutate} = useSWR(`${API_URL}/api/v1/transactions?page=${page}`, fetcher, {
    keepPreviousData: true,
  });
  console.log(data);

  const rowsPerPage = 8;

  const pages = useMemo(() => {
    return data?.count ? Math.ceil(data.count / rowsPerPage) : 0;
  }, [data?.count, rowsPerPage]);

  const loadingState = isLoading ? "loading" : "idle";

  return (
    <Table
      aria-label="Example table with client async pagination"
      bottomContent={
        pages > 0 ? (
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        ) : null
      }
    >
      <TableHeader>
        <TableColumn key="sender">sender</TableColumn>
        <TableColumn key="receiver">receiver</TableColumn>
        <TableColumn key="amount">amount</TableColumn>
        <TableColumn key="signature">signature</TableColumn>
      </TableHeader>
      <TableBody
        items={data?.results ?? []}
        loadingContent={<Spinner />}
        loadingState={loadingState}
      >
        {(item) => (
          <TableRow  key={item?.sender+data?.results.indexOf(item)}>
            {(columnKey) => <TableCell className="">{trim(getKeyValue(item, columnKey))}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
