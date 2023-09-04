import {
  List,
  ListElem,
  Button,
} from 'components/ContactsList/ContactsList.styled';

export const ContactsList = ({ componentsData, onDelete }) => {
  return (
    <List>
      {componentsData.map(({ id, name, number }) => {
        return (
          <ListElem key={id}>
            {name}: {number}
            <Button
              type="button"
              onClick={() => {
                onDelete(id);
              }}
            >
              Delete
            </Button>
          </ListElem>
        );
      })}
    </List>
  );
};
