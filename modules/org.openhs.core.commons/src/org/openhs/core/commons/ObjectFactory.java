package org.openhs.core.commons;

import java.lang.reflect.InvocationTargetException;
import java.util.HashMap;
import java.util.Map;

public class ObjectFactory<ObjectType, Representation> {
	private Map<String, Class<?>> m_creators;

	Class<ObjectType> m_objectTypeKlass = null;

	public ObjectFactory(Class<ObjectType> objectTypeKlass) {
		m_objectTypeKlass = objectTypeKlass;
		m_creators = new HashMap<String, Class<?>>();
	}

	public <S> void registerClass(String id, Class<S> klass) throws IllegalArgumentException {
		if (! m_objectTypeKlass.isAssignableFrom(klass)) {
			throw new IllegalArgumentException(
					"Class type: " + klass.getName() + " is not inherited from: " + m_objectTypeKlass.getName());
		}
		if (m_creators.get(id) != null) {
			throw new IllegalArgumentException("Class already registered: " + klass.getName());
		}
		m_creators.put(id, klass);
	}

	public boolean hasClass(String id) {
		return m_creators.get(id) != null;
	}

	public ObjectType createObject(String id, Representation representation) {
		Class<?> klass = m_creators.get(id);
		ObjectType retval = null;
		if (klass == null) {
			return retval;
		}
		// calls the required createObject() function
		try {
			retval = m_objectTypeKlass.cast(klass.getConstructor(representation.getClass()).newInstance(representation));
		} catch (InstantiationException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IllegalArgumentException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (NoSuchMethodException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (SecurityException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return retval;
	}

	public ObjectType createObject(String id) {
		Class<?> klass = m_creators.get(id);
		ObjectType retval = null;
		if (klass == null) {
			return retval;
		}
		// calls the required createObject() function
		try {
			retval = m_objectTypeKlass.cast(klass.getConstructor().newInstance());
		} catch (InstantiationException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IllegalArgumentException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (NoSuchMethodException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (SecurityException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return retval;
	}
}
