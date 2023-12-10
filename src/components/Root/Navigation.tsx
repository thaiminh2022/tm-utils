import { NavLink } from "@mantine/core";
import { Link } from "react-router-dom";
import { get_paths_by_category } from "../../constants";
import { useIsMobile } from "@/hooks";

type Props = {
  toggle_burger: () => void;
};

function Navigation({ toggle_burger }: Props) {
  let pths = get_paths_by_category();
  const is_mobile = useIsMobile();

  function toggle_burger_when_nav_clicked() {
    if (is_mobile) {
      toggle_burger();
    }
  }

  return (
    <>
      {pths &&
        pths.map((c, i) => {
          const category = c.category.toLocaleUpperCase();
          const paths = c.paths;

          if (c.category == "general") {
            let path_name = paths[0].label;
            let path = paths[0].path;
            return (
              <NavLink
                label={path_name}
                component={Link}
                key={`General - ${paths[0]}`}
                to={path}
                onClick={toggle_burger_when_nav_clicked}
              />
            );
          }

          return (
            <NavLink label={category} key={category + "category"}>
              {paths &&
                paths.map((p) => (
                  <NavLink
                    label={p.label}
                    component={Link}
                    to={p.path}
                    key={`${p.id}-nav`}
                    onClick={toggle_burger_when_nav_clicked}
                  />
                ))}
            </NavLink>
          );
        })}
    </>
  );
}

export default Navigation;
