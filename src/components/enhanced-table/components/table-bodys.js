/* eslint-disable react-hooks/exhaustive-deps */

// @mui-components
import { TableBody, TableRow } from "@mui/material";
// @mui-icons
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
// @components
import Chips from "components/chips";
import { theme } from "components/theme";
import ButtonIcon from "components/button-icon";
import TableCells from "./table-cells";

function TableBodys(props) {
  const { visibleRows } = props;

  const handleClick = (action, id) => {
    props.click(action, id);
  };

  return (
    <>
      <TableBody>
        {visibleRows.map((row, index) => {
          return (
            <TableRow
              hover
              tabIndex={-1}
              key={row.id}
              sx={{ cursor: "pointer" }}
            >
              <TableCells data={row.nom + " " + row.prenom} />
              <TableCells data={row.organisation?.nom} />
              <TableCells data={<Chips label={row.organisation?.statut} />} />
              <TableCells
                data={
                  <>
                    <ButtonIcon
                      id={row.id}
                      action="view"
                      click={handleClick}
                      title="Voir"
                      Icon={RemoveRedEyeOutlinedIcon}
                      color={theme.palette.gray}
                    />
                    <ButtonIcon
                      id={row.id}
                      action="edit"
                      click={handleClick}
                      title="Modifier"
                      Icon={ModeEditOutlineOutlinedIcon}
                      color={theme.palette.gray}
                    />
                    <ButtonIcon
                      id={[row.id, row.organisation.id]}
                      action="delete"
                      click={handleClick}
                      title="Supprimer"
                      Icon={DeleteOutlineOutlinedIcon}
                      color={theme.palette.chips.prospect.color}
                    />
                  </>
                }
              />
            </TableRow>
          );
        })}
      </TableBody>
    </>
  );
}

export default TableBodys;
