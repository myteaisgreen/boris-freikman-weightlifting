import { Button } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'

function RegularMenu({menuOptions}) {
    return (
        <div>
            {menuOptions.map((option, index) => (
              <Button
                variant="outlined"
                fullWidth
                component={Link}
                to={option.link}
              >
                <h3>{option.label}</h3>
              </Button>
            ))}
        </div>
    )
}

export default RegularMenu
