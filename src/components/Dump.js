import { Box } from '@material-ui/core';
import React from 'react';

const Dump = props => (
    <Box>
        {Object.entries(props).map(([key, val]) => (
            <pre key={key}>
                <strong style={{ color: 'white', background: 'red' }}>
                    {key} ?
                </strong>
                {JSON.stringify(val, '', ' ')}
            </pre>
        ))}
    </Box>
);

export default Dump;