import { NavLink } from '@mantine/core'
import React from 'react'
import { Link } from 'react-router-dom'
import { get_paths_by_category } from '../../constants'

type Props = {}

function Navigation({ }: Props) {
    let pths = get_paths_by_category();

    return (
        <>
            {pths && pths.map(c => {
                const category = c.category.toLocaleUpperCase();;
                const paths = c.paths;

                if (c.category == "general") {
                    let path_name = paths[0].label;
                    let path = paths[0].path;
                    return <NavLink key={paths[0].id} label={path_name} component={Link} to={path} />
                }

                return <>
                    <NavLink label={category} key={category}>
                        {
                            paths &&
                            paths.map(p => <NavLink
                                label={p.label}
                                key={p.id}
                                component={Link}
                                to={p.path}
                            />)
                        }
                    </NavLink>
                </>
            })
            }
        </>
    )
}

export default Navigation
