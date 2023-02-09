import React from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

const filter = createFilterOptions();

const Search = ({ fetchProducts, products }) => {

    const search = (keyword) => {
        if (keyword) {
            if (keyword.inputValue) {
                fetchProducts(0, keyword.inputValue)
            } else {
                fetchProducts(0, keyword)
            }
        } else {
            fetchProducts(0, '')
        }
    }

    return (
        <div>
            <Autocomplete
                size="small"
                disablePortal
                freeSolo
                id="combo-box-demo"
                options={[]}
                sx={{ width: 300 }}
                onChange={
                    (event, value) => search(value)
                }
                renderInput={
                    (params) =>
                        <TextField
                            {...params} label="Search..."
                        />
                }
                filterOptions={(options, params) => {
                    const filtered = filter(options, params);

                    const { inputValue } = params;
                    // Suggest the creation of a new value
                    const isExisting = options.some((option) => inputValue === option.title);
                    if (inputValue !== '' && !isExisting) {
                        filtered.push({
                            inputValue,
                            title: `Add "${inputValue}"`,
                        });
                    }

                    return filtered;
                }}
                getOptionLabel={(option) => {
                    // Value selected with enter, right from the input
                    if (typeof option === 'string') {
                        return option;
                    }
                    // Add "xxx" option created dynamically
                    if (option.inputValue) {
                        return option.inputValue;
                    }
                }}
            />
        </div>
    )
}

export default Search