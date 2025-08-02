import { Flex, Grid, Skeleton } from "@radix-ui/themes";
import { SearchArea } from "@/components/SearchArea";
import { ConvList } from "@/components/ConvList";
import { Titlebar } from "@/components/Titlebar";

export default function Home() {
  return (
    <Grid columns={"14rem 1fr"} rows={"2.75rem 1fr"} gap={"2"} width={"100%"} height={"100vh"}>
      <SearchArea showButton={true}/>
      <Skeleton width={"100%"} height={"100%"}></Skeleton>
      <ConvList/>
      <Skeleton width={"100%"} height={"100%"}></Skeleton>
    </Grid>
  );
}
