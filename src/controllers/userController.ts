import { Request, Response } from "express";
import { User } from "../entity/User";
import { AppDataSource } from "../data-source";

const createUser = async (req: Request, res: Response) => {
  const { name, email }: User = req.body;
  let user = await User.findOneBy({ name, email });

  if (user) {
    const nameError =
      user.name === name ? { message: "Username already taken" } : null;
    const emailError =
      user.email === email ? { message: "Email already used" } : null;

    res.json({
      errors: [nameError, emailError].filter((error) => error !== null),
    });

    return;
  }

  user = new User();
  user.name = name;
  user.email = email;

  user = await User.save(user);

  res.json({ user });
};

const findUser = async (where: Parameters<typeof User.findOneBy<User>>[0]) => {
  const user = await User.findOneBy(where);

  if (user) {
    return { user };
  }

  return { errors: [{ message: "User not found" }] };
};

const findUserById = async (id: number) => {
  return findUser({ id });
};

const invalidIdError = { message: "Invalid id number" };

const readUser = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  if (Number.isNaN(id)) {
    res.json({ errors: [invalidIdError] });
    return;
  }

  const { user, errors } = await findUserById(id);

  if (user) {
    res.json({ user });
    return;
  }

  res.json({ errors });
};

const updateUser = async (req: Request, res: Response) => {
  let { id: idParam } = req.params;
  let { name, email } = req.body;
  const id = parseInt(idParam);

  if (Number.isNaN(id)) {
    res.json({ errors: [invalidIdError] });
    return;
  }

  let { user, errors } = await findUserById(id);

  if (!user) {
    res.json({ errors });
    return;
  }

  user.name = name;
  user.email = email;

  const { affected } = await User.update({ id }, user);

  if (affected === 0) {
    res.json({ errors: [{ message: "Could not update user" }] });
    return;
  }

  res.json({ user: await User.findOneBy({ id }) });
};

const deleteUser = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  if (Number.isNaN(id)) {
    res.json({ errors: [invalidIdError] });
    return;
  }

  let { user, errors } = await findUserById(id);

  if (!user) {
    res.json({ errors });
    return;
  }

  const { affected } = await User.delete({ id });

  if (affected === 0) {
    res.json({ errors: [{ message: "Could not delete user" }] });
  } else {
    res.json({ user });
  }
};

export { createUser, readUser, updateUser, deleteUser };
