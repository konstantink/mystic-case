import * as React from "react";

import RemoveOutlined from "@mui/icons-material/RemoveOutlined";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Collapse from "@mui/material/Collapse";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

import StyledSwitch from "./StyledSwitch";
import { PriceField } from "./ProductForm";

interface VariantsProps extends React.PropsWithChildren {
    checked: boolean;
    onCheckedChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

interface OptionProps extends React.PropsWithChildren {
    name: string;
    onOptionNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onOptionRemove: () => void;
}

interface OptionValueProps {
    overridePrice: boolean;
    value: string;
    price: string;
    onOverridePriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onPriceChange: (price: string) => void;
    onOptionValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const OptionValue = ({ overridePrice, price, value = "", onOverridePriceChange, onPriceChange, onOptionValueChange }: OptionValueProps) => (
    <Stack direction="row" alignItems="center" display="grid" sx={{ gridTemplateColumns: "1fr 210px minmax(50px, 150px)" }}>
        <TextField
            fullWidth
            label="Value"
            margin="normal"
            size="small"
            sx={{
                minWidth: "150px",
            }}
            value={value}
            variant="outlined"
            onChange={onOptionValueChange}
        />
        <FormGroup sx={{ margin: "8px 8px 0 8px", minWidth: "150px" }}>
            <FormControlLabel
                control={<Checkbox checked={!!overridePrice} size="small" onChange={onOverridePriceChange} />}
                label="Override product price"
                sx={{
                    color: "rgba(0,0,0,0.6)",
                    "& .MuiFormControlLabel-label": {
                        fontSize: "10pt",
                    },
                }}
            />
        </FormGroup>
        {overridePrice && (
            <PriceField fullWidth={false} margin="dense" price={price} setPrice={onPriceChange}/>
        )}
    </Stack>
);

export const Option = ({ children, name, onOptionNameChange, onOptionRemove }: OptionProps) => (
    <Grid container spacing={1} sx={{ "& input": { fontFamily: "Pangram" } }}>
        <Grid item xs={3}>
            <Box component="div" display="grid" gridTemplateColumns="24px 1fr">
                <IconButton sx={{ marginTop: 3.5, alignItems: "normal", fontSize: "18px", height: 18, padding: 0, width: 18 }} onClick={onOptionRemove}>
                    <RemoveOutlined fontSize="inherit" />
                </IconButton>

                <TextField
                    fullWidth
                    helperText="This will be displayed on product page"
                    label="Option"
                    margin="normal"
                    size="small"
                    value={name}
                    variant="outlined"
                    onChange={onOptionNameChange}
                />
            </Box>
        </Grid>
        <Grid item xs={9}>
            {children}
        </Grid>
    </Grid>
);

export default ({ children, checked, onCheckedChange }: VariantsProps) => (
    <React.Fragment>
        <FormGroup sx={{ flexDirection: "row" }}>
            <FormControlLabel control={<StyledSwitch checked={checked} onChange={onCheckedChange} />} label="Variants" labelPlacement="start" />
        </FormGroup>
        <Collapse orientation="vertical" collapsedSize={0} in={checked}>
            <Box sx={{ background: "#f0f0f0", borderRadius: "4px", boxShadow: "inset 0px 2px 3px rgba(0,0,0,0.38)", height: "100%", padding: "8px 16px" }}>
                {children}
            </Box>
        </Collapse>
    </React.Fragment>
);
