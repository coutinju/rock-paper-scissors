/* TRANSIENT mode allows to prevent the user to send a manual call 
   while an idle call has already been fired
*/
export enum Mode {
    MANUAL,
    TRANSIENT,
    IDLE
}