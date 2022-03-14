import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { TaskList } from '../../components/TaskList';

describe('TaskList', () => {
  it('should be able to add a task', async () => {
    render(<TaskList />);

    const taskInput = screen.getByPlaceholderText('Adicionar novo todo');
    const addTaskButton = screen.getByTestId('add-task-button');

    userEvent.type(taskInput, 'Desafio ReactJS Ignite');
    userEvent.click(addTaskButton);

    const addedFirstTaskTitle = screen.getByText('Desafio ReactJS Ignite');

    expect(addedFirstTaskTitle).toHaveTextContent('Desafio ReactJS Ignite');
    expect(addedFirstTaskTitle.parentElement).not.toHaveClass('completed');

    userEvent.type(taskInput, 'Beber água');
    userEvent.click(addTaskButton);

    const addedSecondTaskTitle = screen.getByText('Beber água');

    expect(addedFirstTaskTitle).toBeInTheDocument();
    expect(addedFirstTaskTitle).toHaveTextContent('Desafio ReactJS Ignite');
    expect(addedFirstTaskTitle.parentElement).not.toHaveClass('completed');

    expect(addedSecondTaskTitle).toHaveTextContent('Beber água');
    expect(addedSecondTaskTitle.parentElement).not.toHaveClass('completed');
  })

  it('should not be able to add a task with a empty title', () => {
    render(<TaskList />);

    const addTaskButton = screen.getByTestId('add-task-button');

    userEvent.click(addTaskButton);

    expect(screen.queryByTestId('task')).not.toBeInTheDocument();

    const taskInput = screen.getByPlaceholderText('Adicionar novo todo');

    userEvent.type(taskInput, 'Desafio ReactJS Ignite');
    userEvent.click(addTaskButton);

    const addedFirstTaskTitle = screen.getByText('Desafio ReactJS Ignite');

    expect(addedFirstTaskTitle).toHaveTextContent('Desafio ReactJS Ignite');
  })

  it('should be able to remove a task', async () => {
    render(<TaskList />);

    const taskInput = screen.getByPlaceholderText('Adicionar novo todo');
    const addTaskButton = screen.getByTestId('add-task-button');

    userEvent.type(taskInput, 'Desafio ReactJS Ignite');
    userEvent.click(addTaskButton);

    userEvent.type(taskInput, 'Beber água');
    userEvent.click(addTaskButton);

    const addedFirstTaskTitle = screen.getByText('Desafio ReactJS Ignite');
    const addedSecondTaskTitle = screen.getByText('Beber água');

    expect(addedFirstTaskTitle).toBeInTheDocument();
    expect(addedSecondTaskTitle).toBeInTheDocument();

    const [addedFirstTaskRemoveButton] = screen.getAllByTestId('remove-task-button');
    userEvent.click(addedFirstTaskRemoveButton);

    expect(addedFirstTaskTitle).not.toBeInTheDocument();
    expect(addedSecondTaskTitle).toBeInTheDocument();
  })

  it('should be able to check a task', () => {
    render(<TaskList />);

    const taskInput = screen.getByPlaceholderText('Adicionar novo todo');
    const addTaskButton = screen.getByTestId('add-task-button');

    userEvent.type(taskInput, 'Desafio ReactJS Ignite');
    userEvent.click(addTaskButton);

    userEvent.type(taskInput, 'Beber água');
    userEvent.click(addTaskButton);

    const [addedFirstTask, addedSecondTask] = screen.getAllByTestId('task');

    if(addedFirstTask.firstChild) {
      userEvent.click(addedFirstTask.firstChild as HTMLElement);
    }

    expect(addedFirstTask).toBeInTheDocument();
    expect(addedFirstTask).toHaveClass('completed');

    expect(addedSecondTask).toBeInTheDocument();
    expect(addedSecondTask).to.not.toHaveClass('completed');
  })
})
