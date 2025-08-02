import { Grid, Skeleton } from "@radix-ui/themes";
import { SearchArea } from "@/components/SearchArea";
import { ConvList } from "@/components/ConvList";

export default function Home() {
  return (
    <Grid columns={"14rem 1fr"} rows={"2.75rem 1fr"} gap={"2"} width={"100%"} height={"100%"}>
      <SearchArea showButton={true}/>
      <Skeleton width={"100%"} height={"100%"}></Skeleton>
      <ConvList/>
      <Skeleton width={"100%"} height={"100%"}></Skeleton>
    </Grid>
  );
}
