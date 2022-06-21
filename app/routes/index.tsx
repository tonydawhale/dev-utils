import { Center, Title } from "@mantine/core";
import { redirects } from "../../public/links";
import { LandingPageCard } from "~/components/LandingPage/LandingPageCard";

export default function Index() {
  return (
      <Center>
        <Title>Welcome</Title>
        {
          redirects.map((group, index) => {
            if (group.links.filter((item) => item.enabled).length > 0) {
              group.links.map((item, index) => {
                  if (item.enabled) {
                      return (
                          <LandingPageCard
                              title={item.title}
                              description={item.description}
                              href={item.href}
                              icon={item.icon}
                              key={`${item.title}-${index}`}
                          />
                      )
                  }
              })
            }
          })
        }
      </Center>
  );
}
