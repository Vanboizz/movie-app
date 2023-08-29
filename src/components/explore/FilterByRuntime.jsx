import { useRouter } from 'next/router';
import React, { useLayoutEffect, useState } from 'react'

const FilterByRuntime = (props) => {
    const { min, max, runtime, step, setRuntime } = props
    const [minValue, setMinValue] = useState(runtime ? runtime.min : min);
    const [maxValue, setMaxValue] = useState(runtime ? runtime.max : max);
    const router = useRouter()

    useLayoutEffect(() => {
        if (runtime) {
            setMinValue(runtime.min);
            setMaxValue(runtime.max);
        }
    }, [runtime]);

    const handleMinChange = e => {
        e.preventDefault();
        const newMinVal = Math.min(+e.target.value, maxValue - step);
        if (!runtime) setMinValue(newMinVal);
        setRuntime({ min: newMinVal, max: maxValue });
        router.push({
            query: {
                ...router.query,
                minRuntime: e.target.value
            }
        })
    };

    const handleMaxChange = e => {
        e.preventDefault();
        const newMaxVal = Math.max(+e.target.value, minValue + step);
        if (!runtime) setMaxValue(newMaxVal);
        setRuntime({ min: minValue, max: newMaxVal });
        router.push({
            query: {
                ...router.query,
                maxRuntime: e.target.value
            }
        })
    };

    const minPos = ((minValue - min) / (max - min)) * 100;
    const maxPos = ((maxValue - min) / (max - min)) * 100;

    return (
        <>
            <p className='text-lg mt-4 text-[#cbd5e1] font-semibold'>Runtime</p>
            <div className='flex justify-between text-[#989898] text-base'>
                <div className='mt-2'>
                    From: <span className='font-bold'>{runtime.min} min</span>
                </div>
                <div className='mt-2'>
                    To: <span className='font-bold'>{runtime.max} min</span>
                </div>
            </div>
            <div className="wrapper">
                <div className="input-wrapper">
                    <input
                        className="input"
                        type="range"
                        value={minValue}
                        min={min}
                        max={max}
                        step={step}
                        onChange={handleMinChange}
                    />
                    <input
                        className="input"
                        type="range"
                        value={maxValue}
                        min={min}
                        max={max}
                        step={step}
                        onChange={handleMaxChange}
                    />
                </div>

                <div className="control-wrapper">
                    <div className="control" style={{ left: `${minPos}%` }} />
                    <div className="rail">
                        <div
                            className="inner-rail"
                            style={{ left: `${minPos}%`, right: `${100 - maxPos}%` }}
                        />
                    </div>
                    <div className="control" style={{ left: `${maxPos}%` }} />
                </div>
            </div>
        </>
    );
}

export default FilterByRuntime