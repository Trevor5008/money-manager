import { Box, Typography } from "@mui/material"
import CachedIcon from "@mui/icons-material/Cached"
import CheckIcon from "@mui/icons-material/Check"
import DeleteIcon from "@mui/icons-material/DeleteOutlined"
import UpcomingIcon from "@mui/icons-material/Upcoming"
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred"

export default function TransactionItems({
   category,
   categoryData,
   transactionData,
   handleDelete
}) {
   if (!categoryData || !transactionData) return null

   return (
    <Box>
        <Typography
                     variant="h2"
                     fontSize={20}
                     fontWeight="bold"
                  >
                     {category}
                  </Typography>
      <ul>
         {categoryData.flatMap((occur, idx) => {
            const name = transactionData.find(
               (item) => {
                  return (
                     item.id ===
                     occur.transactionId
                  )
               }
            ).name
            const isRecurrent =
               transactionData.find((item) => {
                  return (
                     item.id ===
                     occur.transactionId
                  )
               }).iterations > 1
            const isOverdue =
               !occur.isSettled &&
               new Date() > new Date(occur.date)

            return (
               <Box
                  key={idx}
                  display="flex"
                  sx={{
                     width: {
                        xs: "80%",
                        md: "60%",
                        justifyContent:
                           "space-between",
                        alignItems: "center"
                     }
                  }}
               >
                  <Box>
                     {occur.isSettled ? (
                        <CheckIcon
                           sx={{
                              color: "green"
                           }}
                        />
                     ) : isOverdue ? (
                        <Typography>
                           <ReportGmailerrorredIcon
                              sx={{
                                 color: "orange"
                              }}
                           />
                           &nbsp;&nbsp;
                        </Typography>
                     ) : (
                        <Typography>
                           <UpcomingIcon />
                           &nbsp;&nbsp;
                        </Typography>
                     )}
                     {name}: $
                     {occur.amount[0] === '-'
                        ? Number(occur.amount.slice(1)).toFixed(2)
                        : Number(occur.amount).toFixed(2)                        
                    }
                     &nbsp;
                     {isRecurrent && (
                        <CachedIcon />
                     )}
                  </Box>
                  <DeleteIcon
                     sx={{
                        fontSize: {
                           xs: "1.5rem",
                           sm: "2rem"
                        }
                     }}
                     onClick={() =>
                        handleDelete(
                           occur.transactionId
                        )
                     }
                  />
               </Box>
            )
         })}
      </ul>
      </Box>
   )
}
