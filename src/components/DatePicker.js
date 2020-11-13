import React from "react";
import { DateTimePicker as Picker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import DateFnsUtils from '@date-io/date-fns';
import moment from "moment";
import ja from "date-fns/locale/ja";
import CalendarButton from "./CalendarButton";
import { teal } from "@material-ui/core/colors";

const materialTheme = createMuiTheme({
  palette: {
      primary: teal
  }
});

const DatePicker = ({
    className,
    birthdate,
    setBirthdate,
    open,
    toggleOpen
  }) => {
    return (
      <>
        <CalendarButton className={className} type="button" title={moment(birthdate).format("YYYY-MM-DD HH:mm")} onClick={() => toggleOpen(true)} />
        <ThemeProvider theme={materialTheme}>
          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ja}>
            <Picker
              autoOk
              disableFuture={true}
              className="invisible"
              variant="inline" 
              open={open} 
              onOpen={() => toggleOpen(true)} 
              onClose={() => toggleOpen(false)} 
              value={birthdate}
              onChange={setBirthdate} 
              format="yyyy-MM-dd HH:mm"
            />
          </MuiPickersUtilsProvider>
        </ThemeProvider>
      </>
    );
  };

export default DatePicker;