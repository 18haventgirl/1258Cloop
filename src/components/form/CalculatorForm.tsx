import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { calculatorSchema, CalculatorFormValues } from './schema';
import FieldGroup from './FieldGroup';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { generatePlan } from '../../lib/strategies/defaultStrategy';
import { usePlanStore } from '../../store/usePlanStore';
import {
  activityMultipliers,
  carbFactorsByBodyType,
  proteinFactorsByTrainingLevel
} from '../../config/nutrition';

const CalculatorForm = () => {
  const navigate = useNavigate();
  const { input, setPlan } = usePlanStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<CalculatorFormValues>({
    resolver: zodResolver(calculatorSchema),
    defaultValues: {
      gender: input?.gender ?? 'male',
      age: input?.age ?? 28,
      height: input?.height ?? 175,
      weight: input?.weight ?? 70,
      activityLevel: input?.activityLevel ?? 'moderate',
      trainingLevel: input?.trainingLevel ?? 'beginner',
      bodyType: input?.bodyType ?? 'mesomorph',
      fatFactor: input?.fatFactor ?? 1.0
    }
  });

  const onSubmit = (values: CalculatorFormValues) => {
    const plan = generatePlan({ ...values, goal: 'fat_loss' });
    setPlan(values, plan);
    navigate('/result');
  };

  return (
    <Card className="p-6 sm:p-8">
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-6 sm:grid-cols-2">
          <FieldGroup label="性别" error={errors.gender?.message}>
            <Select {...register('gender')}>
              <option value="male">男</option>
              <option value="female">女</option>
            </Select>
          </FieldGroup>

          <FieldGroup label="年龄" error={errors.age?.message}>
            <Input type="number" step="1" min={12} max={80} {...register('age')} />
          </FieldGroup>

          <FieldGroup label="身高 (cm)" error={errors.height?.message}>
            <Input type="number" step="0.1" min={120} max={230} {...register('height')} />
          </FieldGroup>

          <FieldGroup label="体重 (kg)" error={errors.weight?.message}>
            <Input type="number" step="0.1" min={30} max={250} {...register('weight')} />
          </FieldGroup>

          <FieldGroup label="活动水平" error={errors.activityLevel?.message}>
            <Select {...register('activityLevel')}>
              <option value="sedentary">久坐（{activityMultipliers.sedentary}）</option>
              <option value="light">轻度活动（{activityMultipliers.light}）</option>
              <option value="moderate">中度活动（{activityMultipliers.moderate}）</option>
              <option value="high">高度活动（{activityMultipliers.high}）</option>
              <option value="very_high">极高活动（{activityMultipliers.very_high}）</option>
            </Select>
          </FieldGroup>

          <FieldGroup
            label="训练基础"
            tooltip="用于决定蛋白质摄入起点"
            error={errors.trainingLevel?.message}
          >
            <Select {...register('trainingLevel')}>
              <option value="none">无基础（{proteinFactorsByTrainingLevel.none} × 蛋白质）</option>
              <option value="beginner">新手（{proteinFactorsByTrainingLevel.beginner} × 蛋白质）</option>
              <option value="intermediate">中级（{proteinFactorsByTrainingLevel.intermediate} × 蛋白质）</option>
              <option value="advanced">高级（{proteinFactorsByTrainingLevel.advanced} × 蛋白质）</option>
            </Select>
          </FieldGroup>

          <FieldGroup
            label="体型类型"
            tooltip="内胚型易储脂，外胚型较难增重"
            error={errors.bodyType?.message}
          >
            <Select {...register('bodyType')}>
              <option value="endomorph">内胚型（碳水 {carbFactorsByBodyType.endomorph} g/kg）</option>
              <option value="mesomorph">中胚型（碳水 {carbFactorsByBodyType.mesomorph} g/kg）</option>
              <option value="ectomorph">外胚型（碳水 {carbFactorsByBodyType.ectomorph} g/kg）</option>
            </Select>
          </FieldGroup>

          <FieldGroup
            label="脂肪系数 (g/kg)"
            hint="建议范围 0.5~1.5 g/kg"
            error={errors.fatFactor?.message}
          >
            <Input type="number" step="0.1" min={0.5} max={1.5} {...register('fatFactor')} />
          </FieldGroup>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? '生成中...' : '生成计划'}
          </Button>
          <Button type="button" variant="secondary" onClick={() => navigate('/')}>
            返回首页
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default CalculatorForm;
