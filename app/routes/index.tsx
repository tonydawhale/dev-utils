import { Center, Title, Text, Grid } from "@mantine/core";
import { redirects } from "../../public/links";
import { LandingPageCard } from "~/components/LandingPage/LandingPageCard";

export default function Index() {
  return (
      <>
          {
              redirects.map((group, index) => {
                  if (group.links.filter((item) => item.enabled).length > 0) {
                      return (
                          <Grid
                              columns={3}
                              key={index}
                          >
                              <Grid.Col
                                  span={3}
                                  key={index}
                              >
                                  <Title
                                      order={3}
                                      key={index}
                                  >
                                      {group.sectionTitle}
                                  </Title>
                              </Grid.Col>
                              {
                                  group.links.map((item, index) => {
                                      if (item.enabled) {
                                          return (
                                              <Grid.Col span={1}>
                                                  <LandingPageCard
                                                      key={`${item.title}-${index}`}
                                                      title={item.title}
                                                      description={item.description}
                                                      href={item.href}
                                                      icon={item.icon}
                                                  />
                                              </Grid.Col>
                                          )
                                      }
                                  })
                              }
                          </Grid>
                      )
                  }
              })
          }
      </>
  );
}
