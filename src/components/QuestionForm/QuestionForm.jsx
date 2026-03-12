import { Button } from "../Button";
import cls from "./QuestionForm.module.css";

export const QuestionForm = ({ formAction, formState, isPending, submitBtnText }) => {
  return (
    <form action={formAction} className={cls.form}>
      <input type="text" name="questionId" defaultValue={formState.id} hidden />

      <div className={cls.formControl}>
        <label htmlFor="questionField">Question: </label>
        <textarea
          defaultValue={formState.question}
          name="question"
          id="questionField"
          cols="30"
          rows="2"
          required
          placeholder="please enter a question"
        ></textarea>
      </div>
      <div className={cls.formControl}>
        <label htmlFor="answerField">Short Answer: </label>
        <textarea
          defaultValue={formState.answer}
          name="answer"
          id="answerField"
          cols="30"
          rows="2"
          required
          placeholder="please enter a short answer"
        ></textarea>
      </div>
      <div className={cls.formControl}>
        <label htmlFor="descriptionField">Description: </label>
        <textarea
          defaultValue={formState.description}
          name="description"
          id="descriptionField"
          cols="30"
          rows="5"
          required
          placeholder="please enter a full description"
        ></textarea>
      </div>
      <div className={cls.formControl}>
        <label htmlFor="resourcesField">Resources: </label>
        <textarea
          defaultValue={formState.resources}
          name="resources"
          id="resourcesField"
          cols="30"
          rows="5"
          placeholder="please enter resources separated by commas"
        ></textarea>
      </div>
      <div className={cls.formControl}>
        <label htmlFor="levelField">Level: </label>
      </div>
      <select name="level" id="levelField" defaultValue={formState.level}>
        <option disabled>Question level</option>
        <hr />
        <option value="1">1 - easiest</option>
        <option value="2">2 - medium</option>
        <option value="3">3 - hardest</option>
      </select>

      <label htmlFor="clearFormField" className={cls.clearFormControl}>
        <input
          className={cls.checkbox}
          type="checkbox"
          name="clearForm"
          id="clearFormField"
          defaultChecked={formState.clearForm}
        />
        <span>clear form after submitting?</span>
      </label>

      <Button isDisabled={isPending}>{submitBtnText}</Button>
    </form>
  );
};
