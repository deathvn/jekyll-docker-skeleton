echo "Finding... $PYTHON_ENV"

if [ ! -d $PYTHON_ENV ]; then
    echo "Create $PYTHON_ENV"
    python3 -m venv $PYTHON_ENV
fi

echo "Preparing Python dependencies..."
source $PYTHON_ENV/bin/activate
python3 ./_auto/libs_check.py

sleep infinity
